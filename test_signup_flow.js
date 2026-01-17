#!/usr/bin/env node

// Test script to verify the signup and login flow
const { spawn } = require('child_process');

// Test the signup flow
async function testSignupFlow() {
  console.log('Testing signup flow...');
  
  // Test signup
  const signupResult = await fetch('http://localhost:8000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'testuser@example.com',
      name: 'Test User',
      password: 'securepassword123'
    })
  });
  
  if (signupResult.ok) {
    console.log('✓ Signup successful');
    const userData = await signupResult.json();
    console.log('User ID:', userData.id);
  } else {
    console.log('✗ Signup failed:', signupResult.status, await signupResult.text());
    return false;
  }
  
  // Test login
  const loginResult = await fetch('http://localhost:8000/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'testuser@example.com',
      password: 'securepassword123'
    })
  });
  
  if (loginResult.ok) {
    console.log('✓ Login successful');
    const tokenData = await loginResult.json();
    console.log('Access token received');
    
    // Test accessing tasks with token
    const tasksResult = await fetch('http://localhost:8000/api/tasks/', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      }
    });
    
    if (tasksResult.ok) {
      console.log('✓ Tasks endpoint accessible with token');
      const tasks = await tasksResult.json();
      console.log('Number of tasks:', tasks.length);
      return true;
    } else {
      console.log('✗ Tasks endpoint failed:', tasksResult.status, await tasksResult.text());
      return false;
    }
  } else {
    console.log('✗ Login failed:', loginResult.status, await loginResult.text());
    return false;
  }
}

// Run the test
testSignupFlow().then(success => {
  if (success) {
    console.log('\n✓ All tests passed!');
    process.exit(0);
  } else {
    console.log('\n✗ Some tests failed!');
    process.exit(1);
  }
}).catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});