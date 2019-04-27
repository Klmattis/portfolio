import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import { Link } from '../routes';

export default (props) => {
	return (
		<Container>
			<Head>
				<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
			  <link rel="stylesheet/less" type="text/css" href="/static/styles.less" />
			  <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" /> 
			  <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
			  <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
			</Head>
			<div className="navbar">
				<div class="header-table">
			    <div class="tr">
			      <div class="d1">
							<Link route={`/`}>
								<a>Home</a>
							</Link>
			      </div>
			      <div class="d2">PORT-FOL.IO</div>
			      <div class="d3">
							<a href="https://github.com/Klmattis/portfolio">GitHub</a>
							<a>Contact</a>
			      </div>
				  </div>
				</div>
			</div>
			<div className="by-line">BY KEITH MATTISON</div>
			{props.children}
		</Container>
	);
};