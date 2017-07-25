import User from './model';
import { createToken } from './utils/createToken';
import { facebookAuth } from './utils/facebookAuth';
import { googleAuth } from './utils/googleAuth';

export const loginWithAuth0 = async (req, res) => {
  const { provider, token } = req.body;
  let userInfo;

  try {
    if (provider === 'google') {
      userInfo = await googleAuth(token);
    } else {
      userInfo = await facebookAuth(token);
    }

    const user = await User.findOrCreate(userInfo);

    return res.status(200).json({
      sucess: true,
      user: {
        id: user._id,
      },
      token: `JWT ${createToken(user)}`,
    });
  } catch (err) {
    return res.status(400).json({ error: true, errorMessage: err.message });
  }
};
