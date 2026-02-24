export const DRIVER_COLORS = {
    1: '#3671C6', // Max Verstappen (Red Bull Racing)
    30: '#3671C6', // Liam Lawson (Red Bull Racing)
    16: '#E80020', // Charles Leclerc (Ferrari)
    44: '#E80020', // Lewis Hamilton (Ferrari)
    63: '#27F4D2', // George Russell (Mercedes)
    12: '#27F4D2', // Kimi Antonelli (Mercedes)
    4: '#FF8000', // Lando Norris (McLaren)
    81: '#FF8000', // Oscar Piastri (McLaren)
    14: '#229971', // Fernando Alonso (Aston Martin)
    18: '#229971', // Lance Stroll (Aston Martin)
    10: '#52E252', // Pierre Gasly (Alpine)
    7: '#52E252', // Jack Doohan (Alpine)
    55: '#005AFF', // Carlos Sainz (Williams)
    23: '#005AFF', // Alexander Albon (Williams)
    22: '#6692FF', // Yuki Tsunoda (RB)
    20: '#6692FF', // Kevin Magnussen (RB) /* 2026 ? Or Isack Hadjar (37)? Assuming standard drivers for RB right now */ 
    27: '#00E701', // Nico Hulkenberg (Kick Sauber)
    5: '#00E701', // Gabriel Bortoleto (Kick Sauber)
    31: '#B6BABD', // Esteban Ocon (Haas F1 Team)
    87: '#B6BABD', // Oliver Bearman (Haas F1 Team)
    37: '#6692FF', // Isack Hadjar (RB)
};

export const getDriverColor = (driverNumber) => {
    return DRIVER_COLORS[driverNumber] || '#FFFFFF';
};

// Map team names or colors to real F1 team logos
export const TEAM_LOGOS = {
    '#3671C6': 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png',
    '#E80020': 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png',
    '#27F4D2': 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png',
    '#FF8000': 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png',
    '#229971': 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png',
    '#52E252': 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png',
    '#005AFF': 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png',
    '#6692FF': 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png',
    '#00E701': 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png',
    '#B6BABD': 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png',
};

export const getTeamLogoByColor = (color) => {
    return TEAM_LOGOS[color] || null;
};
