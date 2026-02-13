// Increase from 60 to 300 seconds (5 minutes)
// Content doesn't change every minute; 5 minutes provides better cache efficiency
// while still keeping content reasonably fresh
export const revalidateDuration = 300;
