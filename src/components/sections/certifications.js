import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig, certifications } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { GatsbyImage, getImage    } from 'gatsby-plugin-image';

import Icon from '@icons/icon'

const StyledCertificationsSection = styled.section`
  max-width: 800px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;


const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledCertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  .cert-details{
    display: block;
  }

  i {
    font-size: var(--fz-xs);
   
    font-weight: normal;

    color: var(--light-slate);
  }
  svg {
    width: 20px;
    height: 20px;
   
  }

  h3 {
    margin-bottom: 0px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  h4 {
    margin-bottom: 0px;
  }
  
`

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ${({ theme }) => theme.mixins.boxShadow};
 
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  height: 100%;
  padding: 0.6rem 0.6rem;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  transition: var(--transition);
  overflow: auto;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    justify-content: normal;
    align-items: start;
    justify-items: start;
    line-height: 1.1;
    margin-left: 10px;
    margin-right: 10px;

    li {
      margin-bottom: 0px;
    }

  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }



`;




const Certifications = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const images = useStaticQuery(graphql`
    query {
      allFile(filter: {relativeDirectory: {eq: "certificates"}}) {
        edges {
          node {
            base
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);


  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  


  return (
    <StyledCertificationsSection id="certifications" ref={revealContainer}>
      <h2 className="numbered-heading">Professional Certifications</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {certifications &&
            certifications.map((obj, i) => {
          
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{obj.name}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {certifications &&
            certifications.map((obj,i) => {
              
              const imageNode = images.allFile.edges.find(edge => edge.node.base == obj.file);
              const image = getImage(imageNode.node.childImageSharp);
            
              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                      <GatsbyImage  image={image}
                      alt={obj.name + " certificate"}
                      />
                   
                      <StyledCertHeader>
                        <div className="cert-details">
                          <h3>
                          <a href={obj.external_link} target="_blank" rel="noreferrer" class="inline-link">{obj.name}</a>
                          </h3>
        
                          <h4>{obj.issuer} </h4> 
                          <i>{obj.date_acquired}</i> 

                          
                          

                        </div>

                        { obj.external_link && 
                          <a href={obj.external_link} target='_blank' rel="noreferrer">
                          <Icon name="External"/>
                          </a>
                        }
       
                        
                        
                        
                 
                        
                      </StyledCertHeader>

                      <ul>
                        {
                            obj.skills.map((skill, i) => {
                              return (
                                <li>
                                {skill}
                                 </li>
                              )
                            })
                        }
                          
                        </ul>
                 
                  </StyledTabPanel>

                  

                </CSSTransition>
              );
            })}
        </StyledTabPanels>
{/*         

        <StyledTabPanels>
          {certifications &&
            certifications.map((obj, i) => {

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel>
                    <StaticImage src="../../images/certificates/DEA0016805525402.jpg" 
                      alt={obj.name + " certificate"}
                      />
                  </StyledTabPanel>
                </CSSTransition>

              )
          
            })}

        </StyledTabPanels> */}
        
      </div>
    </StyledCertificationsSection>
  );
};

export default Certifications;
