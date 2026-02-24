/*
======================================
BRONX BOMBERS MEDIA - SCRIPTS.JS
======================================
*/

// wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // initialize mobile menu
    initMobileMenu();
    
    // initialize player spotlight
    // note: this function is now updated to handle player data more effectively
    initPlayerSpotlight();

    // initialize hot take comments section
    initHotTake();

    // initialize predictions section
    initPredictions();

    // initialize contact form
    initContactForm();
});

// mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            
            const spans = menuToggle.querySelectorAll('span');
            
            if (navMenu.classList.contains('show')) {
                // animate to close icon
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                // animate back to hamburger icon
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// player spotlight functionality
function initPlayerSpotlight() {
    const playerButtons = document.querySelectorAll('.player-button');
    
    if (playerButtons.length > 0) {
        // all player data stored in an object
        const players = {
            judge: {
                name: 'Aaron Judge',
                position: 'Right Field | #99 | 2025 Season',
                stats: {
                    avg: '.414',
                    hr: '11',
                    rbi: '33',
                    ops: '1.262'
                },
                statLabels: ['AVG', 'HR', 'RBI', 'OPS'],
                bio: 'Aaron Judge is off to a historic start in the 2025 season, leading the majors in batting average and OPS. His refined approach at the plate has resulted in a career-low strikeout rate and increased contact, solidifying his status as a premier hitter.',
                image: 'images/aaron-judge.jpg 1x, images/aaron-judge@2x.jpg 2x',
                accolades: ['2022 AL MVP', '5× All-Star', '2022 AL HR Record (62)']
            },
            stanton: {
                name: 'Giancarlo Stanton',
                position: 'Designated Hitter | #27 | 2024 Season',
                stats: {
                    avg: '.233',
                    hr: '27',
                    rbi: '72',
                    ops: '.773'
                },
                statLabels: ['AVG', 'HR', 'RBI', 'OPS'],
                bio: 'Stanton had a notable postseason, hitting .273 with 7 home runs and 16 RBIs, earning the ALCS MVP award.',
                image: 'images/giancarlo-stanton.jpg',
                accolades: ['2017 NL MVP', '5× All-Star', '2× Silver Slugger']
            },
            cole: {
                name: 'Gerrit Cole',
                position: 'Starting Pitcher | #45 | 2024 Season',
                stats: {
                    era: '3.41',
                    so: '99',
                    whip: '1.02',
                    wins: '15'
                },
                statLabels: ['ERA', 'SO', 'WHIP', 'W'],
                bio: 'Despite elbow issues limiting his season, Cole maintained a solid ERA and contributed significantly during the postseason with a 2.17 ERA over five starts.',
                image: 'images/gerrit-cole.webp',
                accolades: ['2023 AL Cy Young', '6× All-Star', '2019 MLB Strikeout Leader']
            }
        };
        
        // transition for spotlight info and image
        const spotlightInfo = document.querySelector('.spotlight-info');
        const spotlightImage = document.getElementById('spotlight-player-image');
        if (spotlightInfo && spotlightImage) {
            spotlightInfo.style.transition = 'opacity 0.3s ease';
            spotlightImage.style.transition = 'opacity 0.3s ease';
        }
        
        // adding click event to each player button
        playerButtons.forEach(button => {
            button.addEventListener('click', () => {
                // check if the button is already active
                // if not, proceed to update the spotlight
                if (!button.classList.contains('active')) {
                    // remove active class from all buttons
                    playerButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // add active class to the clicked button
                    button.classList.add('active');
                    
                    // get player data from the button's dataset
                    const playerId = button.dataset.player;
                    const player = players[playerId];
                    
                    if (player) {
                        // fade out elements
                        if (spotlightInfo) spotlightInfo.style.opacity = '0';
                        if (spotlightImage) spotlightImage.style.opacity = '0';
                        
                        // update player information after a short delay
                        setTimeout(() => {
                            updatePlayerInfo(player);
                            
                            // Fade in elements
                            if (spotlightInfo) spotlightInfo.style.opacity = '1';
                            if (spotlightImage) spotlightImage.style.opacity = '1';
                        }, 300);
                    }
                }
            });
        });
    }
}

// update player information in the spotlight
function updatePlayerInfo(player) {
    const nameElement = document.getElementById('spotlight-player-name');
    const positionElement = document.getElementById('spotlight-player-position');
    const bioElement = document.getElementById('spotlight-bio');
    const imageElement = document.getElementById('spotlight-player-image');
    
    // get all stat-label elements
    const statLabels = document.querySelectorAll('.stat-label');
    
    // get all stat-value elements
    const statValues = [
        document.getElementById('stat-avg'),
        document.getElementById('stat-hr'),
        document.getElementById('stat-rbi'),
        document.getElementById('stat-ops')
    ];
    
    // update stat labels and values
    if (statLabels.length === statValues.length) {
        for (let i = 0; i < statLabels.length; i++) {
            statLabels[i].textContent = player.statLabels[i];
            
            const statKey = Object.keys(player.stats)[i];
            statValues[i].textContent = player.stats[statKey];
        }
    }
    
    if (nameElement) nameElement.textContent = player.name;
    if (positionElement) positionElement.textContent = player.position;
    if (bioElement) {
        bioElement.innerHTML = `<p>${player.bio}</p>`;
        
        // apply different text styles based on player
        if (player.name === 'Aaron Judge') {
            bioElement.style.fontWeight = 'bold';
            bioElement.style.color = '#FFFFFF';
        } else if (player.name === 'Giancarlo Stanton') {
            bioElement.style.fontWeight = 'bold';
            bioElement.style.color = '#FFFFFF';
        } else {
            bioElement.style.fontWeight = 'bold';
            bioElement.style.color = '#FFFFFF';
        }
    }
    
    if (imageElement) {
        const isSrcSet = player.image.includes('1x') || player.image.includes('2x');
        if (isSrcSet) {
            imageElement.setAttribute('srcset', player.image);
            imageElement.setAttribute('src', player.image.split(' ')[0]); // fallback
        } else {
            imageElement.setAttribute('src', player.image);
            imageElement.removeAttribute('srcset'); // remove previous srcset if any
        }
        imageElement.alt = player.name;
    }
    
    
    // add pulse effect to stats
    animateStats();
}

// animate stats with pulse effect
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        stat.classList.add('pulse-effect');
        
        setTimeout(() => {
            stat.classList.remove('pulse-effect');
        }, 2000);
    });
}

// hot take comments section functionality
function initHotTake() {
    const revealButton = document.getElementById('reveal-comments');
    const commentsSection = document.getElementById('comments-section');
    
    if (revealButton && commentsSection) {
        // set initial styles for comments section
        commentsSection.style.transition = 'all 0.4s ease';
        commentsSection.style.maxHeight = '0';
        commentsSection.style.overflow = 'hidden';
        
        revealButton.addEventListener('click', () => {
            if (commentsSection.style.display === 'block') {
                commentsSection.style.maxHeight = '0';
                
                setTimeout(() => {
                    commentsSection.style.display = 'none';
                    revealButton.textContent = 'Share Your Thoughts';
                }, 400);
            } else {
                commentsSection.style.display = 'block';
                
                setTimeout(() => {
                    commentsSection.style.maxHeight = '1000px'; // Large enough to fit content
                    revealButton.textContent = 'Hide Comments';
                }, 10);
            }
        });
        
        // add event listener to the comment form
        const commentForm = document.getElementById('comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const textarea = commentForm.querySelector('textarea');
                if (textarea && textarea.value.trim() !== '') {
                    const commentsList = document.querySelector('.comments-list') || document.createElement('div');
                    if (!document.querySelector('.comments-list')) {
                        commentsList.className = 'comments-list';
                        commentsList.style.marginTop = '2rem';
                    }
                    
                    const comment = document.createElement('div');
                    comment.className = 'user-comment';
                    comment.style.padding = '1rem';
                    comment.style.marginBottom = '1rem';
                    comment.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    comment.style.borderRadius = '8px';
                    comment.style.borderLeft = '3px solid #E4002C';
                    
                    const commentText = document.createElement('p');
                    commentText.textContent = textarea.value;
                    
                    const timestamp = document.createElement('span');
                    timestamp.className = 'comment-time';
                    timestamp.textContent = 'Just now';
                    timestamp.style.fontSize = '0.75rem';
                    timestamp.style.color = '#C4CED4';
                    timestamp.style.display = 'block';
                    timestamp.style.marginTop = '0.5rem';
                    
                    comment.appendChild(commentText);
                    comment.appendChild(timestamp);
                    commentsList.appendChild(comment);
                    
                    // append comments list to comments section
                    if (!document.querySelector('.comments-list')) {
                        commentsSection.appendChild(commentsList);
                    }
                    
                    textarea.value = '';
                    
                    const successMessage = document.createElement('div');
                    successMessage.textContent = 'Comment added successfully!';
                    successMessage.style.padding = '0.75rem';
                    successMessage.style.marginTop = '1rem';
                    successMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    successMessage.style.borderRadius = '4px';
                    successMessage.style.color = '#fff';
                    
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(() => {
                            successMessage.remove();
                        }, 500);
                    }, 3000);
                    
                    commentForm.appendChild(successMessage);
                }
            });
        }
    }
}

// predictions section functionality
function initPredictions() {
    const predictionButtons = document.querySelectorAll('.prediction-button');
    const predictionResult = document.getElementById('prediction-result');
    
    if (predictionButtons.length > 0 && predictionResult) {
        // predictions data
        const predictions = {
            option1: {
                text: 'Yankees winning 100+ games is highly likely based on their current roster and performance trends. Their run differential points to a team capable of winning 102-105 games.',
                percentage: '78%',
                analysis: 'The team is on a 102-win pace through the first quarter of the season.'
            },
            option2: {
                text: 'The Yankees having 3+ All-Stars is almost certain given their star power and performance levels. Judge, Cole, and Soto are all performing at elite levels.',
                percentage: '92%',
                analysis: 'Current voting trends show strong support for multiple Yankees players.'
            },
            option3: {
                text: 'The Yankees leading MLB in home runs is a strong possibility with their power-focused lineup. Their home ballpark and lineup construction favor this outcome.',
                percentage: '65%',
                analysis: 'Currently ranking 2nd in MLB, trailing only Atlanta by 3 HRs.'
            }
        };
        
        predictionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const predictionId = button.dataset.prediction;
                const prediction = predictions[predictionId];
                
                if (prediction) {
                    // update prediction result text and apply styling
                    predictionResult.innerHTML = `
                        <p><strong>Analysis:</strong> ${prediction.text}</p>
                        <p><strong>Confidence Level:</strong> ${prediction.percentage}</p>
                        <p><strong>Current Status:</strong> ${prediction.analysis}</p>
                    `;
                    
                    // adding a meter to show confidence level
                    const meterContainer = document.createElement('div');
                    meterContainer.style.marginTop = '1rem';
                    meterContainer.style.backgroundColor = '#f0f0f0';
                    meterContainer.style.height = '8px';
                    meterContainer.style.borderRadius = '4px';
                    meterContainer.style.overflow = 'hidden';
                    
                    const meterFill = document.createElement('div');
                    const percentage = parseInt(prediction.percentage);
                    meterFill.style.width = percentage + '%';
                    meterFill.style.height = '100%';
                    meterFill.style.backgroundColor = getConfidenceColor(percentage);
                    meterFill.style.transition = 'width 1s ease-in-out';
                    
                    meterContainer.appendChild(meterFill);
                    predictionResult.appendChild(meterContainer);
                    
                    predictionButtons.forEach(btn => {
                        btn.style.backgroundColor = '#0C2340';
                    });
                    button.style.backgroundColor = '#E4002C';
                }
            });
        });
    }
}

// get color based on confidence percentage
function getConfidenceColor(percentage) {
    if (percentage >= 80) {
        return '#4CAF50'; // green = high confidence
    } else if (percentage >= 60) {
        return '#FFC107'; // yellow = medium confidence
    } else {
        return '#FF5722'; // orange/red = lower confidence
    }
}

// contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                formStatus.textContent = 'Please fill out all required fields.';
                formStatus.style.color = '#E4002C';
                return;
            }
            
            // simulate form submission
            formStatus.textContent = 'Sending message...';
            formStatus.style.color = '#0C2340';
            
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';
                submitButton.style.opacity = '0.7';
            }
            
            setTimeout(() => {
                contactForm.reset();
                
                formStatus.textContent = 'Message sent successfully! We\'ll be in touch soon.';
                formStatus.style.color = 'green';
                
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                    submitButton.style.opacity = '1';
                }
                
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
}