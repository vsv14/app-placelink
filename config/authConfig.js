module.exports = {
  
    jwt: {
      secret: "bekoder-secret-key",
      tokens: {
        access: {
          type: 'access',
          expiresIn: '12m'
        },
        refresh: {
          type: 'refresh',
          expiresIn: '10 days'
        }
      },
    },    
  };