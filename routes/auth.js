const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { User } = require('../db/User');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

router.get('/', (req, res) => {
    return res.status(404);
});

// ユーザー新規登録
router.post(
    '/signup',
    body('user_id'),
    body('password').isLength({ min: 7 }),
    async (req, res) => {

        const email = req.body.user_id;
        const password = req.body.password;

        // バリデーションチェック
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        //
        // // DB にユーザーが存在しているか確認
        // const user = User.find((user) => user.email === email);
        // if (user) {
        //     return res.status(400).json([
        //         {
        //             message: 'そのユーザーはすでに存在しています。',
        //         },
        //     ]);
        // }
        //
        // // パスワードの暗号化
        // let hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        //
        // // DB へ保存
        // User.push({
        //     email,
        //     password: hashedPassword,
        // });
        //
        // // クライアントへJWT発行（JSON Web Token： 許可証）
        // const token = await JWT.sign(
        //     {
        //         email,
        //     },
        //     'SECRET_KEY', // ←ここの文字列は何でも良いです、今回検証のため分かりやすく左記の文字列を指定しています。
        //     {
        //         expiresIn: '12h',
        //     },
        // );
        const aa = 'aa';
        return res.json({
            "message": "Account successfully created",
            "user": {
                "user_id": email,
                "nickname": password
            }
        });
    },
);

// ログイン用のAPI
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = User.find((user) => user.email === email);

    if (!user) {
        return res.status(400).json([
            {
                message: '入力されたユーザーは存在しません',
            },
        ]);
    }

    // パスワードの復号、照合
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json([
            {
                message: '入力されたパスワードが異なります。',
            },
        ]);
    }

    const token = await JWT.sign(
        {
            email,
        },
        'SECRET_KEY',
        {
            expiresIn: '12h',
        },
    );

    return res.json({
        token: token,
    });
});

//DBのユーザーを確認するAPI
router.get('/allUsers', (req, res) => {
    return res.json(User);
});

module.exports = router;