// eslint-disable-next-line import/no-anonymous-default-export
export default  (req, res) => {
    res.status(200).json(
        { 
            id: +req.query.id,
            name: 'John Doe' 
        }
    )
}