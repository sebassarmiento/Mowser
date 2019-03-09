const timeAgo = time => {

    console.log('Time',time)

    let timeStamp = new Date(time.join('.'))
    let now = new Date(),
    
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if(secondsPast < 60){
      return parseInt(secondsPast) + 's';
    }
    if(secondsPast < 3600){
      return parseInt(secondsPast/60) + 'm';
    }
    if(secondsPast <= 86400){
      return parseInt(secondsPast/3600) + 'h';
    }
    if(secondsPast > 86400){
        let day = timeStamp.getDate();
        let month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        let year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
        return day + " " + month + year;
    }

    console.log(date)

    return '1 month ago'
}

export default timeAgo
