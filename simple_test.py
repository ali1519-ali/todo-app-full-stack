import urllib.request
import json

try:
    req = urllib.request.Request('http://127.0.0.1:8080/')
    response = urllib.request.urlopen(req)
    data = response.read()
    print("Backend is responding!")
    print("Response:", data.decode())
except Exception as e:
    print(f"Error connecting to backend: {e}")