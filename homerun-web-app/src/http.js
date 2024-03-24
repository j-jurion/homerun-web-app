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