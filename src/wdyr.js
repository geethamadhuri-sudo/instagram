import React from 'react';


  // const whyDidYouRender = require('@welldone-software/why-did-you-render');
  import whyDidYouRender from '@welldone-software/why-did-you-render';
  
  whyDidYouRender(React, {
    onlyLogs:true,
    titleColor:'green',
    diffNameColor:'darkturquoise',
    trackAllPureComponents: true,
  });

