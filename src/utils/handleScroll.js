export default (element, direction) => {

    let maxScroll = element.scrollWidth - element.clientWidth

    let previous = element.scrollLeft

    let intervalRight = null, intervalLeft = null

    if(direction === 'right' && element.scrollLeft !== maxScroll){
        intervalRight = setInterval(() => {
            console.log('entra 1')
            element.scrollLeft += 3
            if(element.scrollLeft === maxScroll || element.scrollLeft > previous + 400){
                clearInterval(intervalRight)
                intervalRight = null
                hideArrow()
            }
        }, 1)
    } else if(direction === 'left' && element.scrollLeft !== 0) {
        intervalLeft = setInterval(() => {
            console.log('entra 2')
            element.scrollLeft -= 3
            if(element.scrollLeft === 0 || element.scrollLeft < previous - 400){
                clearInterval(intervalLeft)
                intervalLeft = null
                hideArrow()
            }
        }, 1)
    }

    let hideArrow = () => {
        if(direction === 'left' && element.scrollLeft < 4){
            console.log('Borra el izquierdo')
            console.log(element.querySelector('.fa-long-arrow-alt-left'))
            element.querySelector('.fa-long-arrow-alt-left').classList.add('hidden-arrow')
        } else {
            element.querySelector('.fa-long-arrow-alt-left').classList.remove('hidden-arrow')
        }
        if(direction === 'right' && element.scrollLeft > maxScroll - 4){
            console.log('Borra el derecho')
            element.querySelector('.fa-long-arrow-alt-right').classList.add('hidden-arrow')
        } else {
            element.querySelector('.fa-long-arrow-alt-right').classList.remove('hidden-arrow')
        }
    }

    console.log(element.scrollLeft)

    return null
}