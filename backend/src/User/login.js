import {react} from 'react';
import login from '@/components/login';
const LoginPage = () => {
    const handleSubmit = (req, res) => {
        const { email, password } = req.body;
        const getUserByEmail = `SELECT * FROM users WHERE email = ?`;
        db.query(getUserByEmail, [email], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const user = results[0];
            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            return res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
        });
    };
    const get ("/login", (req, res) => {
        res.send("Login endpoint is working");
    });

    const listener = app.listen(3001, () => {
        console.log("Server is running on port " + listener.address().port);
    });
    

    return (
        <div>
            <login onSubmit={handleSubmit} />
        </div>
    );
};
export default LoginPage;
