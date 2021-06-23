import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Container, Drawer, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import React from 'react'
import _ from 'lodash';

const Filters = (props) => {

    const useStyles = makeStyles((theme) => {
        return ({
            drawer: {
                position: "static",
                width: '240px'
            }, capitalizeWord: {
                textTransform: 'capitalize'
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
                    expandIcon={<ExpandMoreOutlined />}
                    aria-controls={filterName}
                    id={filterName}
                >
                    <Typography className={classes.capitalizeWord}>{filterName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        {[filterColl]}
                    </Container>
                </AccordionDetails>
            </Accordion>)
        })

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