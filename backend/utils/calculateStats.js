const calculateStats = (totalVisits, createdAt) => {
    const now = new Date();
    const creationDate = new Date(createdAt);
    const numTotalVisits = totalVisits.length
    
    // difference en ms
    const timeDiff = now - creationDate;
    
    // num days, weeks and months (if < 1 = 1)
    const numDays = Math.max(1, timeDiff / (1000 * 3600 * 24)); // day ms
    const numWeeks = Math.max(1, timeDiff / (1000 * 3600* 24 * 7)); // week ms
    const numMonths = Math.max(1, timeDiff / (1000 * 3600 * 24 * 30.44)); // month ms
    
    // moy
    const averageDaily = numTotalVisits / numDays;
    const averageWeekly = numTotalVisits / numWeeks;
    const averageMonthly = numTotalVisits / numMonths;
  
    return {
      totalVisits: numTotalVisits,
      averageDaily: parseFloat(averageDaily.toFixed(2)),
      averageWeekly: parseFloat(averageWeekly.toFixed(2)),
      averageMonthly: parseFloat(averageMonthly.toFixed(2))
    };
  };

  export default calculateStats
