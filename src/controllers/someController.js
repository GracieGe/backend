exports.protectedMethod = (req, res) => {
    res.json({ msg: 'This is a protected route' });
  };