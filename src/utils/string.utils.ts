function capitalize(string: string): string {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function getCapitals(string: string): string {
    return string.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase()).join('')
}

export {
    capitalize,
    getCapitals
}
