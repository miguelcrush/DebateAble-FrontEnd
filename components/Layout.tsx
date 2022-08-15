import * as React from 'react';
import {Grid, GridItem, Flex, Spacer} from '@chakra-ui/react';

type LayoutProps ={
    children:any;
}

export const Layout = (props: LayoutProps) =>{
    return (
        <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'150px 1fr'}
        h='200px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'header'}>
          Header
        </GridItem>
        <GridItem pl='2' area={'nav'}>
          Nav
        </GridItem>
        <GridItem pl='2' area={'main'}>
          {props.children}
        </GridItem>
        <GridItem pl='2' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    )
}
