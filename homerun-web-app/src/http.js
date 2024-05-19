export async function postActivity(activity) {
  console.log("posting activity BUSY");
  const response = await fetch('http://127.0.0.1:8000/api/activities/1/', {
    method: 'POST',
    body: JSON.stringify(activity),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resData = await response.json();
  console.log("posting activity DONE")

  if (!response.ok) {
    throw new Error('Failed to add activity.');
  }

  return resData;
}


export async function getConfig() {
    console.log("fetching config BUSY")
    const response = await fetch('http://127.0.0.1:8000/api/config/');
    const resData = await response.json();
    console.log("fetching config DONE")
  
    if (!response.ok) {
      throw new Error('Failed to fetch config');
    }
  
    return resData;
  }