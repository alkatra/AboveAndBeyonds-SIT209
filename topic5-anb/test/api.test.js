const axios = require('axios')

API_URL="https://api.openstreetmap.org/api/0.6"

// Simple test to check everything is working properly
test('[EXPECT PASS] Test 2+2 = 4', () => {
    expect(2+2).toEqual(4);
});

// Tests API version, which is 0.6 according to API_URL
test('[EXPECT PASS] Test API version', async() => {
    axios.get(`${API_URL}/way/23326189.json`).then(resp => {
        expect(resp.data.version).toEqual('0.6');
    }); 

});

// Tests Element type of element 
test('[EXPECT PASS] Test element type', async () => {
    await axios.get(`${API_URL}/way/23326189.json`).then(resp => {
        const data = resp.data.elements[0].type;
        expect(data).toEqual('way');
    })
});

// Tests location tags
test('[EXPECT PASS] Test element type', async () => {
    await axios.get(`${API_URL}/way/554571571.json`).then(resp => {
        const data = resp.data.elements[0].tags.brand;
        expect(data).toEqual('Mazda'); // actual: way
    })
});

// Test first node
test('[EXPECT PASS] Test first node location in nodes array', async () => {
    await axios.get(`${API_URL}/way/31999630.json`).then(resp => {
        const data = resp.data.elements[0].nodes[0];
        expect(data).toEqual(358668269); 
    })
});

// Tests maxspeed of way 
test('[EXPECT FAIL] Test maxspeed', async () => {
    await axios.get(`${API_URL}/way/23326189.json`).then(resp => {
        const data = resp.data.elements[0].tags.maxspeed;
        expect(data).toEqual('70'); // actual: 60
    })
});

// Tests timezone of NSW, Australia
test('[EXPECT FAIL] Test timezone of NSW', async () => {
    await axios.get(`${API_URL}/relation/7493838.json`).then(resp => {
        const data = resp.data.elements[0].tags.timezone;
        expect(data).toEqual('Nepal/Kathmandu'); // actual: Australia/Sydney
    })
});

// Test tags.natural of a reef
test('[EXPECT FAIL] Test natural tag of a reef', async () => {
    await axios.get(`${API_URL}/way/189271285.json`).then(resp => {
        const data = resp.data.elements[0].tags.natural;
        expect(data).toEqual('coastline'); // actual: reef
    })
});

// Test lattitude of node
test('[EXPECT FAIL] Test lattitude of node', async () => {
    await axios.get(`${API_URL}/node/6251979493.json`).then(resp => {
        const data = resp.data.elements[0].lat;
        expect(data).toEqual(-6.1669811); // actual: -6.1669809
    })
});

// Test religion type of place of worship
test('[EXPECT FAIL] Test religion type of place of worship', async () => {
    await axios.get(`${API_URL}/way/155110694.json`).then(resp => {
        const data = resp.data.elements[0].tags.religion;
        expect(data).toEqual('hindu'); // actual: Buddhist
    })
});