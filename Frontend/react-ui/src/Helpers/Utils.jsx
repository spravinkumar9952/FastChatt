

// give the current time in hh:mm PM/AM
export const currentTime = new Date().toLocaleTimeString("en-US", { timeStyle: 'short', hour12: true });
