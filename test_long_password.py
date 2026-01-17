#!/usr/bin/env python3
"""
Test script to verify that long passwords (>72 bytes) are properly handled
"""

import requests
import json
import sys

BASE_URL = "http://localhost:8000"  # Adjust this to your backend server address

def test_long_password_registration():
    print("Testing registration with a long password (>72 bytes)...")

    # Create a password longer than 72 bytes
    long_password = "a" * 80  # 80 characters, definitely longer than 72 bytes
    signup_data = {
        "email": "testlongpassword@example.com",
        "name": "Test User Long Password",
        "password": long_password
    }

    print(f"Password length: {len(long_password)} characters")
    print(f"Password length in bytes: {len(long_password.encode('utf-8'))} bytes")

    try:
        response = requests.post(f"{BASE_URL}/api/auth/signup", json=signup_data)

        if response.status_code == 200:
            print("✓ Registration with long password successful")
            user_data = response.json()
            print(f"  User ID: {user_data.get('id')}")
            return True
        elif response.status_code == 409:
            print("⚠ User already exists, but registration would have worked")
            return True
        else:
            print(f"✗ Registration failed: {response.status_code} - {response.text}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"✗ Cannot connect to server at {BASE_URL}. Is the backend running?")
        return False
    except Exception as e:
        print(f"✗ Error during registration test: {str(e)}")
        return False

def test_long_password_login():
    print("\nTesting login with a long password (>72 bytes)...")

    # Use the same long password
    long_password = "a" * 80
    signin_data = {
        "email": "testlongpassword@example.com",
        "password": long_password
    }

    try:
        response = requests.post(f"{BASE_URL}/api/auth/signin", json=signin_data)

        if response.status_code == 200:
            print("✓ Login with long password successful")
            return True
        elif response.status_code == 401:
            print("✗ Login failed: Incorrect email or password")
            return False
        else:
            print(f"✗ Login failed: {response.status_code} - {response.text}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"✗ Cannot connect to server at {BASE_URL}. Is the backend running?")
        return False
    except Exception as e:
        print(f"✗ Error during login test: {str(e)}")
        return False

if __name__ == "__main__":
    print("Starting long password tests...")

    success1 = test_long_password_registration()
    success2 = test_long_password_login()

    if success1 and success2:
        print("\n✓ All long password tests passed!")
        sys.exit(0)
    else:
        print("\n✗ Some long password tests failed!")
        sys.exit(1)