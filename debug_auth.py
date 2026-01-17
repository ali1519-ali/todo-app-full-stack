import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from backend.src.utils.auth import verify_token

# Test token decoding
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlcjJAZXhhbXBsZS5jb20iLCJleHAiOjE3Njg2Mzg3MDl9.B0YnDFH0Ovmf0OcEDcRCYyMnVmJ1yexWuJHWJIZ2EjY"

try:
    result = verify_token(token)
    print(f"Token verification result: {result}")
except Exception as e:
    print(f"Error verifying token: {e}")