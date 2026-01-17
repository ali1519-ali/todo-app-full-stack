#!/usr/bin/env python3
"""
Test script to verify the authentication flow works correctly
"""

import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def test_auth_flow():
    print("Testing authentication flow...")
    
    # Step 1: Register a new user
    print("\n1. Registering a new user...")
    signup_data = {
        "email": "testuser@example.com",
        "name": "Test User",
        "password": "securepassword123"
    }
    
    response = requests.post(f"{BASE_URL}/api/auth/signup", json=signup_data)
    
    if response.status_code == 200:
        print("✓ User registration successful")
        user_data = response.json()
        print(f"  User ID: {user_data.get('id')}")
    elif response.status_code == 409:
        print("⚠ User already exists, continuing with login...")
    else:
        print(f"✗ User registration failed: {response.status_code} - {response.text}")
        return False
    
    # Step 2: Sign in to get JWT token
    print("\n2. Signing in to get JWT token...")
    signin_data = {
        "email": "testuser@example.com",
        "password": "securepassword123"
    }
    
    response = requests.post(f"{BASE_URL}/api/auth/signin", json=signin_data)
    
    if response.status_code == 200:
        print("✓ Sign in successful")
        token_data = response.json()
        access_token = token_data.get('access_token')
        print(f"  Token type: {token_data.get('token_type')}")
        print(f"  Access token: {access_token[:20]}..." if access_token else "  No token received")
    elif response.status_code == 401:
        print("✗ Sign in failed: Incorrect email or password")
        return False
    else:
        print(f"✗ Sign in failed: {response.status_code} - {response.text}")
        return False
    
    # Step 3: Use JWT token to access protected endpoint
    print("\n3. Using JWT token to access tasks endpoint...")
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    
    response = requests.get(f"{BASE_URL}/api/tasks/", headers=headers)
    
    if response.status_code == 200:
        print("✓ Successfully accessed protected endpoint")
        tasks = response.json()
        print(f"  Number of tasks: {len(tasks)}")
        return True
    elif response.status_code == 401:
        print(f"✗ Authentication failed: {response.json()}")
        return False
    else:
        print(f"✗ Failed to access tasks endpoint: {response.status_code} - {response.text}")
        return False

def test_invalid_token():
    print("\n\nTesting with invalid token...")
    
    # Try to access protected endpoint with invalid token
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer invalid-token-123"
    }
    
    response = requests.get(f"{BASE_URL}/api/tasks/", headers=headers)
    
    if response.status_code == 401:
        print("✓ Correctly rejected invalid token")
        return True
    else:
        print(f"✗ Should have been rejected but got: {response.status_code}")
        return False

if __name__ == "__main__":
    print("Starting authentication flow tests...")
    
    success1 = test_auth_flow()
    success2 = test_invalid_token()
    
    if success1 and success2:
        print("\n✓ All tests passed!")
        sys.exit(0)
    else:
        print("\n✗ Some tests failed!")
        sys.exit(1)