module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')

        const result = await db.get_dragon_treasure(1)

        res.status(200).send(result)
    },

    getUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user
        const result = await db.get_user_treasure(id)

        res.status(200).send(result)

    }
}