const NodeCache = require("node-cache");
class AuthCache {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds*0.5,
      useClones: false,
    });
    this.multipleToken=false;
    this.maxToken=4;
  }

  getUser(id) {
    return this.cache.get(id);
  }

  setUser(user){   
        let res=this.cache.get(user.id);
        if(res){   
          if(this.multipleToken){
            user.tokens=[...res.tokens,{token:user.accessToken, dt: new Date()}];
            if(user.tokens.length>this.maxToken)
              user.tokens.shift();
          }
          else{
            user.tokens=[{token:user.accessToken, dt: new Date()}];
          }
          let _id=user.id;
          delete user["id"];
          delete user["accessToken"];
          this.cache.set(_id, {...user});
        }
        else{
          user.tokens=[{token:user.accessToken, dt:new Date()}];
          let _id=user.id;
          delete user["id"];
          delete user["accessToken"];
          this.cache.set(_id, {...user});
        }
  }

  setToken(userId,tkn){
    let user=this.cache.get(userId);
    if(user){
      if(this.multipleToken){
        user.tokens=[...user.tokens,{token:tkn, dt: new Date()}];
        if(user.tokens.length>this.maxToken)
          user.tokens.shift();
      }
      else{
        user.tokens=[{token:tkn, dt: new Date()}];
      }
      delete user["id"];
      delete user["accessToken"];
      this.cache.set(userId, {...user});
    }
  }

  isTokenExist(userId,tkn){
    let user=this.cache.get(userId);
    if (user.tokens && user.tokens.filter(e => e.token === tkn).length > 0) {
      return(true);
    }
    else{
      return(false);
    }
  }

  delUser(id) {
    this.cache.del(id);
  }

  flush() {
    this.cache.flushAll();
  }

  getStatics(){
    console.log(this.cache.getStats());
  }

  printAll() {
    let mykeys = this.cache.keys();
    mykeys.map((key) => {
        global.log(JSON.stringify(this.getUser(key)),"",'i',"");
    });
  }
}

const _authCache = new AuthCache(86400);
module.exports = _authCache;
