
export const handleArrayCopy = (arr) => {
    let results = ""
    let num = 1
    for (const team of arr) {
        let teamString = `קבוצה ${num} \n`
        for (const player of team) {
            teamString += `${player.name} \n` 
        }
        teamString += '\n \n \n'
        results += teamString
        num += 1 
    }

    return results;
}