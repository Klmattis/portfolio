import React, { Component } from 'react';
import { Card, List } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/vitae/factory';
import Vitae from '../../ethereum/vitae/vitae';

class VitaeIndex extends Component {

	static async getInitialProps(props) {
		const vitaes = await factory.methods.getDeployedVitaes().call();
		const vitae = Vitae(vitaes[0]);
		const owner = await vitae.methods.owner().call();
		const contactInfo = await vitae.methods.getContactInfo(0).call();
		const resumeInfo = await vitae.methods.getResumeInfo(0).call();

		let workExperienceInfo = [];
		let workExperienceInfoLength = await vitae.methods.getWorkExperienceLength().call();
		workExperienceInfoLength = workExperienceInfoLength.toNumber();
		for (let i = 0; i < workExperienceInfoLength; i++) {
			const thisWorkExperienceInfo = await vitae.methods.getWorkExperience(i).call();
			workExperienceInfo.push(thisWorkExperienceInfo);
		}

		let educationInfo = [];
		let educationInfoLength = await vitae.methods.getEducationLength().call();
		educationInfoLength = educationInfoLength.toNumber();
		for (let i = 0; i < educationInfoLength; i++) {
			const thisEducationInfo = await vitae.methods.getEducation(i).call();
			educationInfo.push(thisEducationInfo);
		}

		let skillsInfo = [];
		let skillsInfoLength = await vitae.methods.getSkillsLength().call();
		skillsInfoLength = skillsInfoLength.toNumber();
		for(let i = 0; i < skillsInfoLength; i++) {
			const thisSkillInfo = await vitae.methods.getSkill(i).call();
			skillsInfo.push(thisSkillInfo);
		}

		let certificatesInfo = [];
		let certificatesInfoLength = await vitae.methods.getCertificatesLength().call();
		certificatesInfoLength = certificatesInfoLength.toNumber();
		for(let i = 0; i < certificatesInfoLength; i++) {
			const thisCertificateInfo = await vitae.methods.getCertificate(i).call();
			certificatesInfo.push(thisCertificateInfo);
		}

		return { 
			address: vitae.address,
			owner: owner,
			name: contactInfo[0],
			mailingAddress: contactInfo[1],
			phone: contactInfo[2],
			email: contactInfo[3],
			website: contactInfo[4],
			summary: resumeInfo[0],
			misc: resumeInfo[1],
			workExperiences: workExperienceInfo,
			educations: educationInfo,
			skills: skillsInfo,
			certificates: certificatesInfo
		};
	}

	renderVitae() {
		const educationItems = [];
		const workExperienceItems = [];
		const skillItems = [];
		const certificateItems = [];

		for (const [index, value] of this.props.workExperiences.entries()) {
				const employer = value[0];
				const yearStart = value[1];
				const yearEnd = value[2];
				const position = value[3];
				const duties = value[4];
				workExperienceItems.push(
					<div key={index}>
						<div className='workexperience-employer-text'>{position} - {employer}</div>
						<div className='workexperience-year-text'>{yearStart} - {yearEnd}</div>
						<div className='workexperience-duties-text'>{duties}</div>
						<br />
					</div>
				);
		}

		for (const [index, value] of this.props.educations.entries()) {
				const school = value[0];
				const yearStart = value[1];
				const yearEnd = value[2];
				const degree = value[3];
				educationItems.push(
					<div key={index}>
						<div className='educations-school-text'>{school}</div>
						<div className='educations-year-text'>{yearStart} - {yearEnd}</div>
						<div className='educations-duties-text'>{degree}</div>
						<br />
					</div>
				);
		}

		for (const [index, value] of this.props.skills.entries()) {
				const skill = value[0];
				const comment = value[1];
				skillItems.push(
					<div key={index}>
						<div className='skill-left'>{skill}</div>
						<div className='skill-right'>{comment}</div>
					</div>
				);
		}

		for (const [index, value] of this.props.certificates.entries()) {
				const cert = value[0];
				const year = value[1];
				certificateItems.push(
					<div key={index}>
						<div className='certificates-cert-text'>{cert}</div>
						<div className='certificates-year-text'>{year}</div>
					</div>
				);
		}

		return (
			<div className='vitae-main'>
				<div className='vitae-name-text'>{this.props.name}</div>
				<List>
			    <List.Item icon='marker' content={this.props.mailingAddress} />
			    <List.Item icon='phone' content={this.props.phone} /> 
			    <List.Item icon='mail' content={this.props.email} />
	    		<List.Item icon='linkify' content={this.props.website} />
	  		</List>
	  		<div className='vitae-summary'>{this.props.summary}</div>
	  		<div className='details-section'>
		  		<div className='vitae-section-header'>Work Experience</div>
		  		<div>{workExperienceItems}</div>
		  		<div className='vitae-section-header'>Education</div>
		  		{educationItems}
		  		<div className='vitae-section-header'>Certifications</div>
		  		<div>{certificateItems}</div>
		  	</div>
		  	<div className='skill-section'>
		  		<div className='vitae-section-header'>Skills</div>
		  		<div>{skillItems}</div>
	  		</div>
			</div>
		);
	}

	render() {
		return(
			<Layout>
				<a id='etherscan-hyperlink' href='https://rinkeby.etherscan.io/address/0x570f7f036efAA593ea504fF61Fb08C22713fb56E'>VIEW ON ETHERSCAN</a>
				<br /><br />
				{this.renderVitae()}
			</Layout>
		);
	}
}

export default VitaeIndex;