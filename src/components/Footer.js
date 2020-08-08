import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import StorageIcon from '@material-ui/icons/Storage';
import '../style/Footer.css';
import infoImage from '../images/info.jpg';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';

function Footer() {
    const [open, setOpen] = useState(false);

    const copytoClipboard = (mailID) => {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = mailID;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = { position: 'absolute', left: '-9999px' };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
        setOpen(true);
    };

    function onPrimaryMailIDClick() {
        copytoClipboard('eaknathmanoj@gmail.com');
    };

    function onSecondaryMailIDClick() {
        copytoClipboard('theaasthasaxena@gmail.com');
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className="footer">
            <div className="covid19">
                <h5 className="names">
                    Covid 19 Tracker
                </h5>
                <div>
                    <Tooltip title="Code repository" arrow>
                        <IconButton color="primary" size="small" onClick={() => window.open('https://www.linkedin.com/in/eaknathmanoj/')}>
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Data" arrow>
                        <IconButton color="primary" size="small" onClick={() => window.open('https://disease.sh/docs/')}>
                            <StorageIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mail" arrow>
                        <IconButton id="eaknathmanoj@gmail.com" color="primary" size="small" onClick={onPrimaryMailIDClick}>
                            <MailIcon />
                        </IconButton>
                    </Tooltip>
                </div>

            </div>
            <div>
                <img className="infoImage" src={infoImage} alt="logo" />
            </div>
            <div className="credits">
                <div className="createdBy">
                    <h6 className="footerHeader">
                        Created by
                     </h6>
                    <h5 className="names">
                        Manoj Kumar
                     </h5>
                    <div>
                        <Tooltip title="Mail" arrow>
                            <IconButton color="primary" size="small" onClick={onPrimaryMailIDClick}>
                                <MailIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="LinkedIn" arrow>
                            <IconButton color="primary" size="small" onClick={() => window.open('https://www.linkedin.com/in/eaknathmanoj/')}>
                                <LinkedInIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Instagram" arrow>
                            <IconButton color="primary" size="small" onClick={() => window.open('https://www.instagram.com/eaknathmanoj/')}>
                                <InstagramIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="logoBy">
                    <h6 className="footerHeader">
                        Logo design
                     </h6>
                    <h5 className="names">
                        Aastha Saxena
                     </h5>
                    <div>
                        <Tooltip title="Mail" arrow>
                            <IconButton id="" color="primary" size="small" onClick={onSecondaryMailIDClick}>
                                <MailIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="LinkedIn" arrow>
                            <IconButton color="primary" size="small" onClick={() => window.open('https://www.linkedin.com/in/theaasthasaxena/')}>
                                <LinkedInIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Instagram" arrow>
                            <IconButton color="primary" size="small" onClick={() => window.open('https://www.instagram.com/theaasthasaxena/')}>
                                <InstagramIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Mail ID copied to clipboard."
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div >
    )
}

export default Footer
