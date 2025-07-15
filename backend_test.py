#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import uuid

class EmergencySystemAPITester:
    def __init__(self, base_url="https://b9a842d9-2385-4fca-b253-52f42f730925.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_incident_id = None
        self.created_unit_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and len(str(response_data)) < 500:
                        print(f"   Response: {response_data}")
                    elif isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test basic API health check"""
        return self.run_test("API Health Check", "GET", "", 200)

    def test_create_incident(self):
        """Test creating a new emergency incident"""
        incident_data = {
            "type": "fire",
            "location": {
                "latitude": 40.7128,
                "longitude": -74.0060,
                "address": "New York, NY"
            },
            "description": "Building fire on 5th floor",
            "reporter_name": "John Doe",
            "reporter_phone": "+1234567890"
        }
        
        success, response = self.run_test(
            "Create Emergency Incident",
            "POST",
            "incidents",
            200,
            data=incident_data
        )
        
        if success and 'id' in response:
            self.created_incident_id = response['id']
            print(f"   Created incident ID: {self.created_incident_id}")
        
        return success, response

    def test_get_incidents(self):
        """Test getting all incidents"""
        return self.run_test("Get All Incidents", "GET", "incidents", 200)

    def test_get_incident_by_id(self):
        """Test getting a specific incident by ID"""
        if not self.created_incident_id:
            print("❌ Skipped - No incident ID available")
            return False, {}
        
        return self.run_test(
            "Get Incident by ID",
            "GET",
            f"incidents/{self.created_incident_id}",
            200
        )

    def test_update_incident_status(self):
        """Test updating incident status"""
        if not self.created_incident_id:
            print("❌ Skipped - No incident ID available")
            return False, {}
        
        update_data = {
            "status": "dispatched"
        }
        
        return self.run_test(
            "Update Incident Status",
            "PUT",
            f"incidents/{self.created_incident_id}",
            200,
            data=update_data
        )

    def test_create_unit(self):
        """Test creating a new emergency unit"""
        unit_data = {
            "type": "fire_truck",
            "name": "Fire Truck 1",
            "current_location": {
                "latitude": 40.7589,
                "longitude": -73.9851,
                "address": "Fire Station 1, NYC"
            }
        }
        
        success, response = self.run_test(
            "Create Emergency Unit",
            "POST",
            "units",
            200,
            data=unit_data
        )
        
        if success and 'id' in response:
            self.created_unit_id = response['id']
            print(f"   Created unit ID: {self.created_unit_id}")
        
        return success, response

    def test_get_units(self):
        """Test getting all units"""
        return self.run_test("Get All Units", "GET", "units", 200)

    def test_get_unit_by_id(self):
        """Test getting a specific unit by ID"""
        if not self.created_unit_id:
            print("❌ Skipped - No unit ID available")
            return False, {}
        
        return self.run_test(
            "Get Unit by ID",
            "GET",
            f"units/{self.created_unit_id}",
            200
        )

    def test_update_unit(self):
        """Test updating unit availability"""
        if not self.created_unit_id:
            print("❌ Skipped - No unit ID available")
            return False, {}
        
        update_data = {
            "is_available": False
        }
        
        return self.run_test(
            "Update Unit Availability",
            "PUT",
            f"units/{self.created_unit_id}",
            200,
            data=update_data
        )

    def test_dashboard_stats(self):
        """Test getting dashboard statistics"""
        return self.run_test("Get Dashboard Stats", "GET", "dashboard/stats", 200)

    def test_error_handling(self):
        """Test error handling for non-existent resources"""
        fake_id = str(uuid.uuid4())
        
        # Test getting non-existent incident
        success1, _ = self.run_test(
            "Get Non-existent Incident",
            "GET",
            f"incidents/{fake_id}",
            404
        )
        
        # Test getting non-existent unit
        success2, _ = self.run_test(
            "Get Non-existent Unit",
            "GET",
            f"units/{fake_id}",
            404
        )
        
        return success1 and success2

    def test_invalid_data(self):
        """Test API with invalid data"""
        # Test creating incident with missing required fields
        invalid_incident = {
            "type": "invalid_type",  # Invalid emergency type
            "description": "Test"
            # Missing location
        }
        
        success, _ = self.run_test(
            "Create Incident with Invalid Data",
            "POST",
            "incidents",
            422  # Validation error
        )
        
        return success

def main():
    print("🚨 Emergency Response System API Testing")
    print("=" * 50)
    
    tester = EmergencySystemAPITester()
    
    # Run all tests in sequence
    test_methods = [
        tester.test_health_check,
        tester.test_create_incident,
        tester.test_get_incidents,
        tester.test_get_incident_by_id,
        tester.test_update_incident_status,
        tester.test_create_unit,
        tester.test_get_units,
        tester.test_get_unit_by_id,
        tester.test_update_unit,
        tester.test_dashboard_stats,
        tester.test_error_handling,
        tester.test_invalid_data
    ]
    
    print(f"\n🔄 Running {len(test_methods)} test suites...")
    
    for test_method in test_methods:
        try:
            test_method()
        except Exception as e:
            print(f"❌ Test suite failed with exception: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! API is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the API implementation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())