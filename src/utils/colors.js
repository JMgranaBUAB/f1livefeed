export const DRIVER_COLORS = {
    1: '#3671C6', // Max Verstappen (Red Bull Racing)
    11: '#3671C6', // Sergio Perez (Red Bull Racing)
    16: '#E80020', // Charles Leclerc (Ferrari)
    55: '#E80020', // Carlos Sainz (Ferrari)
    44: '#27F4D2', // Lewis Hamilton (Mercedes)
    63: '#27F4D2', // George Russell (Mercedes)
    4: '#FF8000', // Lando Norris (McLaren)
    81: '#FF8000', // Oscar Piastri (McLaren)
    14: '#229971', // Fernando Alonso (Aston Martin)
    18: '#229971', // Lance Stroll (Aston Martin)
    10: '#52E252', // Pierre Gasly (Alpine)
    31: '#52E252', // Esteban Ocon (Alpine)
    23: '#005AFF', // Alexander Albon (Williams)
    2: '#005AFF', // Logan Sargeant (Williams)
    3: '#6692FF', // Daniel Ricciardo (RB)
    22: '#6692FF', // Yuki Tsunoda (RB)
    77: '#00E701', // Valtteri Bottas (Kick Sauber)
    24: '#00E701', // Zhou Guanyu (Kick Sauber)
    20: '#B6BABD', // Kevin Magnussen (Haas F1 Team)
    27: '#B6BABD', // Nico Hulkenberg (Haas F1 Team)
};

export const getDriverColor = (driverNumber) => {
    return DRIVER_COLORS[driverNumber] || '#FFFFFF';
};
