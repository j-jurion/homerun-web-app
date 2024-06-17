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

export async function putActivity(activity) {
  console.log("putting activity BUSY");
  const response = await fetch('http://127.0.0.1:8000/api/activities/1/', {
    method: 'PUT',
    body: JSON.stringify(activity),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resData = await response.json();
  console.log("putting activity DONE")

  if (!response.ok) {
    throw new Error('Failed to edit activity.');
  }

  return resData;
}

export async function getActivities(userId, type) {
  console.log("fetching activities BUSY");
  const response = await fetch(`http://127.0.0.1:8000/api/activities/${userId}/${type}/`);
  const resData = await response.json();
  console.log("fetching activities DONE");

  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }

  return resData;
}

export async function getActivity(activityId) {
  console.log("fetching activity BUSY");
  const response = await fetch(`http://127.0.0.1:8000/api/activities/${activityId}/`);
  const resData = await response.json();
  console.log("fetching activity DONE");

  if (!response.ok) {
    throw new Error('Failed to fetch activity');
  }

  return resData;
}

export async function deleteActivity(activityId) {
  console.log("deleting activity BUSY");
  const response = await fetch(`http://127.0.0.1:8000/api/activities/${activityId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resData = await response.json();
  console.log("deleting activity DONE");

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