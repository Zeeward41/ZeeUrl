const calculateStats = (totalVisits,uniqueVisits, createdAt) => {
    const now = new Date();
    const creationDate = new Date(createdAt);

    
    // difference en ms
    const timeDiff = now - creationDate;
    
    // num days, weeks and months (if < 1 = 1)
    const numDays = Math.max(1, timeDiff / (1000 * 3600 * 24)); // day ms
    const numWeeks = Math.max(1, timeDiff / (1000 * 3600* 24 * 7)); // week ms
    const numMonths = Math.max(1, timeDiff / (1000 * 3600 * 24 * 30.44)); // month ms
    
    // moy
    const averageDaily = totalVisits / numDays;
    const averageWeekly = totalVisits / numWeeks;
    const averageMonthly = totalVisits / numMonths;
    // unique
    const averageDailyUnique = uniqueVisits / numDays;
    const averageWeeklyUnique = uniqueVisits / numWeeks;
    const averageMonthlyUnique = uniqueVisits / numMonths;
  
    return {
      totalVisits: totalVisits,
      averageDaily: parseFloat(averageDaily.toFixed(2)),
      averageWeekly: parseFloat(averageWeekly.toFixed(2)),
      averageMonthly: parseFloat(averageMonthly.toFixed(2)),
      uniqueVisits: uniqueVisits,
      averageDailyUnique: parseFloat(averageDailyUnique.toFixed(2)),
      averageWeeklyUnique: parseFloat(averageWeeklyUnique.toFixed(2)),
      averageMonthlyUnique: parseFloat(averageMonthlyUnique.toFixed(2))
    };
  };

  export default calculateStats
