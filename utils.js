exports.getCurrentWeekNumber = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

exports.getWeekDates = (year, week) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const days = (week - 1) * 7;
    const startOfWeek = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + days));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return { start: startOfWeek, end: endOfWeek };
}

exports.getWeeklyTasks = (week) => {
    const members = ['Ale', 'Eric', 'Pol'];
    const tasks = ['Bagno', 'Cucina', 'Soggiorno'];

    const weekTasks = [];
    for (let i = 0; i < 4; i++) {
        const rotatedMembers = members.slice(i).concat(members.slice(0, i));
        weekTasks.push({
            weekNumber: week + i,
            tasks: {
                Bathroom: rotatedMembers[0],
                Kitchen: rotatedMembers[1],
                LivingRoom: rotatedMembers[2]
            }
        });
    }
    return weekTasks;
}