import jwt from 'jsonwebtoken'


const createAccessToken = (user) => {
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_SEC_KEY, { expiresIn: '1h' });
    return accessToken;
};


const createRefreshToken = (user) => {
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SEC_KEY, { expiresIn: '7d' });
    return refreshToken;
};

export const capitalizeEachWord = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

export {
    createAccessToken,
    createRefreshToken
}
