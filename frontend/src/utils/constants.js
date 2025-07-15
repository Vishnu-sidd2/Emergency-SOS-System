// Emergency Types
export const EMERGENCY_TYPES = {
  FIRE: 'fire',
  MEDICAL: 'medical',
  POLICE: 'police'
};

// Incident Status
export const INCIDENT_STATUS = {
  REPORTED: 'reported',
  DISPATCHED: 'dispatched',
  EN_ROUTE: 'en_route',
  ON_SCENE: 'on_scene',
  RESOLVED: 'resolved'
};

// Unit Types
export const UNIT_TYPES = {
  AMBULANCE: 'ambulance',
  FIRE_TRUCK: 'fire_truck',
  POLICE: 'police'
};

// Status Colors
export const STATUS_COLORS = {
  reported: "from-red-500 to-red-700",
  dispatched: "from-yellow-500 to-yellow-700",
  en_route: "from-blue-500 to-blue-700",
  on_scene: "from-purple-500 to-purple-700",
  resolved: "from-green-500 to-green-700"
};

// 3D Colors
export const INCIDENT_COLORS = {
  fire: '#ef4444',
  medical: '#10b981', 
  police: '#3b82f6'
};

export const UNIT_COLORS = {
  ambulance: '#10b981',
  fire_truck: '#ef4444',
  police: '#3b82f6'
};