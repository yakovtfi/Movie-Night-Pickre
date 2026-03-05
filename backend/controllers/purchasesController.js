import { readPurchasesFile ,writePurchasesFile } from "../data/loadData.js";

export const postPurchasesSeats = async (req, res) => {
    try {
        const { movieId, seatNumber } = req.body || {};
        if (!movieId || !seatNumber) {
            return res.status(400).json({ error: 'movieId and seatNumber are required' });
        }

        const purchases = await readPurchasesFile();

        if (!purchases[movieId]) purchases[movieId] = [];
        if (!purchases[movieId].includes(seatNumber)) {
            purchases[movieId].push(seatNumber);
            await writePurchasesFile(purchases);
            return res.status(201).json({ movieId, seats: purchases[movieId] });
        }

        return res.status(200).json({ movieId, seats: purchases[movieId], note: 'seat already recorded' });
    } catch (err) {
        console.error('postPurchasesSeats error', err);
        return res.status(500).json({ error: 'Failed to save purchase' });
    }
};


export const getPurchases = async (req, res) => {
    try {
        const { movieId } = req.query || {};
        const purchases = await readPurchasesFile();
        if (movieId) {
            const seats = purchases[movieId] || [];
            return res.json({ movieId, seats });
        }
        return res.json(purchases);
    } catch (err) {
        console.error('getPurchases error', err);
        return res.status(500).json({ error: 'Failed to read purchases' });
    }
};
