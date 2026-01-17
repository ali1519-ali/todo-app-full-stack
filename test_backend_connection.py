import requests

try:
    response = requests.get('http://127.0.0.1:8080/health')
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error connecting to backend: {e}")