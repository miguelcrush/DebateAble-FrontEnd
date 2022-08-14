import NextAuth, { NextAuthOptions } from "next-auth"
import OktaProvider from "next-auth/providers/okta"

export const authOptions: NextAuthOptions ={
  providers: [
    OktaProvider({
      clientId: String(process.env.OKTA_CLIENT_ID),
      clientSecret: String(process.env.OKTA_CLIENT_SECRET),
      issuer: process.env.OKTA_ISSUER
    })
  ],
  callbacks:{
    async jwt({token, account}){
      if(account){
        token.accessToken=account.access_token;   
      }
      return token;
    }
  }
};

export default NextAuth(authOptions);