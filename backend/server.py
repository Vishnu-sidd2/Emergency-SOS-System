from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Emergency Types
class EmergencyType(str, Enum):
    FIRE = "fire"
    MEDICAL = "medical"
    POLICE = "police"

# Incident Status
class IncidentStatus(str, Enum):
    REPORTED = "reported"
    DISPATCHED = "dispatched"
    EN_ROUTE = "en_route"
    ON_SCENE = "on_scene"
    RESOLVED = "resolved"

# Unit Types
class UnitType(str, Enum):
    FIRE_TRUCK = "fire_truck"
    AMBULANCE = "ambulance"
    POLICE_CAR = "police_car"

# Models
class Location(BaseModel):
    latitude: float
    longitude: float
    address: Optional[str] = None
    timestamp: Optional[str] = None

class EmergencyIncident(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: EmergencyType
    location: Location
    status: IncidentStatus = IncidentStatus.REPORTED
    reporter_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    assigned_unit_id: Optional[str] = None
    response_time_seconds: Optional[int] = None

class EmergencyIncidentCreate(BaseModel):
    type: EmergencyType
    location: Location
    reporter_name: Optional[str] = None

class EmergencyIncidentUpdate(BaseModel):
    status: Optional[IncidentStatus] = None
    assigned_unit_id: Optional[str] = None
    response_time_seconds: Optional[int] = None

class EmergencyUnit(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: UnitType
    name: str
    current_location: Location
    is_available: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class EmergencyUnitCreate(BaseModel):
    type: UnitType
    name: str
    current_location: Location

class EmergencyUnitUpdate(BaseModel):
    current_location: Optional[Location] = None
    is_available: Optional[bool] = None

# Emergency Incident Routes
@api_router.post("/incidents", response_model=EmergencyIncident)
async def create_incident(incident: EmergencyIncidentCreate):
    """Create a new emergency incident - optimized for speed"""
    incident_dict = incident.dict()
    incident_obj = EmergencyIncident(**incident_dict)
    await db.incidents.insert_one(incident_obj.dict())
    return incident_obj

@api_router.get("/incidents", response_model=List[EmergencyIncident])
async def get_incidents():
    """Get all emergency incidents"""
    incidents = await db.incidents.find().to_list(1000)
    return [EmergencyIncident(**incident) for incident in incidents]

@api_router.get("/incidents/{incident_id}", response_model=EmergencyIncident)
async def get_incident(incident_id: str):
    """Get a specific incident by ID"""
    incident = await db.incidents.find_one({"id": incident_id})
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return EmergencyIncident(**incident)

@api_router.put("/incidents/{incident_id}", response_model=EmergencyIncident)
async def update_incident(incident_id: str, update: EmergencyIncidentUpdate):
    """Update an incident status or assignment"""
    incident = await db.incidents.find_one({"id": incident_id})
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    update_dict = update.dict(exclude_unset=True)
    update_dict["updated_at"] = datetime.utcnow()
    
    # Calculate response time if status is changing to resolved
    if update.status == IncidentStatus.RESOLVED:
        created_at = incident["created_at"]
        if isinstance(created_at, str):
            created_at = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
        response_time = (datetime.utcnow() - created_at).total_seconds()
        update_dict["response_time_seconds"] = int(response_time)
    
    await db.incidents.update_one(
        {"id": incident_id},
        {"$set": update_dict}
    )
    
    updated_incident = await db.incidents.find_one({"id": incident_id})
    return EmergencyIncident(**updated_incident)

# Emergency Units Routes
@api_router.post("/units", response_model=EmergencyUnit)
async def create_unit(unit: EmergencyUnitCreate):
    """Create a new emergency unit"""
    unit_dict = unit.dict()
    unit_obj = EmergencyUnit(**unit_dict)
    await db.units.insert_one(unit_obj.dict())
    return unit_obj

@api_router.get("/units", response_model=List[EmergencyUnit])
async def get_units():
    """Get all emergency units"""
    units = await db.units.find().to_list(1000)
    return [EmergencyUnit(**unit) for unit in units]

@api_router.get("/units/{unit_id}", response_model=EmergencyUnit)
async def get_unit(unit_id: str):
    """Get a specific unit by ID"""
    unit = await db.units.find_one({"id": unit_id})
    if not unit:
        raise HTTPException(status_code=404, detail="Unit not found")
    return EmergencyUnit(**unit)

@api_router.put("/units/{unit_id}", response_model=EmergencyUnit)
async def update_unit(unit_id: str, update: EmergencyUnitUpdate):
    """Update unit location or availability"""
    unit = await db.units.find_one({"id": unit_id})
    if not unit:
        raise HTTPException(status_code=404, detail="Unit not found")
    
    update_dict = update.dict(exclude_unset=True)
    update_dict["updated_at"] = datetime.utcnow()
    
    await db.units.update_one(
        {"id": unit_id},
        {"$set": update_dict}
    )
    
    updated_unit = await db.units.find_one({"id": unit_id})
    return EmergencyUnit(**updated_unit)

# Dashboard Stats
@api_router.get("/6")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    total_incidents = await db.incidents.count_documents({})
    active_incidents = await db.incidents.count_documents({"status": {"$ne": "resolved"}})
    available_units = await db.units.count_documents({"is_available": True})
    
    # Average response time for resolved incidents
    resolved_incidents = await db.incidents.find({"status": "resolved", "response_time_seconds": {"$exists": True}}).to_list(1000)
    avg_response_time = 0
    if resolved_incidents:
        total_response_time = sum(incident["response_time_seconds"] for incident in resolved_incidents)
        avg_response_time = total_response_time / len(resolved_incidents)
    
    return {
        "total_incidents": total_incidents,
        "active_incidents": active_incidents,
        "available_units": available_units,
        "avg_response_time_seconds": int(avg_response_time)
    }

# Basic health check
@api_router.get("/")
async def root():
    return {"message": "Emergency Response System API - Speed Optimized"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()