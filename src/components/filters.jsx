import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Container, Drawer, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import React from 'react'
import _ from 'lodash';

const Filters = (props) => {

    const useStyles = makeStyles((theme) => {
        console.log(theme)
        return ({
            drawer: {
                position: "static",
                width: "240px",
                [theme.breakpoints.down("md")]: {
                    width: "100%",
                }
            }, capitalizeWord: {
                textTransform: 'capitalize',
                fontWeight: 700
            }, accordianHeader: {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText
            }, arrowColor: {
                color: theme.palette.common.white
            }
        })
    })
    const classes = useStyles();
    const { filters } = props;


    let accordian = [];


    if (filters && !_.isEmpty(filters)) {
        accordian = _.map(filters, (filterArr, filterName) => {
            const filterColl = _.map(filterArr, (filter) => {
                return (
                    <Typography key={filter.id}>

                        <FormControlLabel
                            onClick={() => {
                                const val = _.find(filters[filterName], { id: filter.id });

                                val.checked = !!!val.checked;

                                props.updateFilter(filters);
                            }}
                            control={<Checkbox checked={filter.checked || false} name={filter.name} />}
                            label={filter.name}
                        />
                    </Typography>
                )
            })
            return (<Accordion defaultExpanded={true} key={filterName}>
                <AccordionSummary
                    expandIcon={<ExpandMoreOutlined className={classes.arrowColor} />}
                    aria-controls={filterName}
                    id={filterName}
                    color="secondary"
                    className={classes.accordianHeader}
                >
                    <Typography variant="h6" className={classes.capitalizeWord}>{filterName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        {[filterColl]}
                    </Container>
                </AccordionDetails>
            </Accordion>)
        })

    } else {
        accordian = (<Accordion defaultExpanded={true} >
            <AccordionDetails>

            </AccordionDetails>
        </Accordion>)
    }
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classes.drawer
            }}
        >

            {accordian}
        </Drawer>
    )
}

export default Filters;