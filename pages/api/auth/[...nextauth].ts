import NextAuth, { NextAuthOptions } from "next-auth"
import OktaProvider from "next-auth/providers/okta"
import { getCurrentUser } from "../../../data/user";

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

      console.log(`token callback`);

      //get the current user
      var currentUser = await getCurrentUser(token.accessToken as string);
      token.currentUser = currentUser.data;

      return token;
    }
  }
};

export default NextAuth(authOptions);