export const getRangeNumber = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/range`, {
        method: "GET",
        },
    )
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; 
    }
  }
