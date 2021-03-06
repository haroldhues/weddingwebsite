import React from 'react'

import { withStyles } from '@material-ui/core/es/styles'
import TextField from '@material-ui/core/es/TextField'
import FormControl from '@material-ui/core/es/FormControl'
import FormLabel from '@material-ui/core/es/FormLabel'
import RadioGroup from '@material-ui/core/es/RadioGroup'
import Radio from '@material-ui/core/es/Radio'
import FormControlLabel from '@material-ui/core/es/FormControlLabel'
import Button from '@material-ui/core/es/Button'
import { Layout } from '../components/layout'
import { compose, withState, defaultProps } from 'recompose'
import './rsvp.module.scss'

const styles = theme => ({
  formControl: {
    marginTop: `${theme.spacing.unit * 3}px`,
  },
  group: {
    marginLeft: `${theme.spacing.unit}px`,
    marginTop: `${theme.spacing.unit}px`,
  },
  button: {
    marginTop: `${theme.spacing.unit * 3}px`,
  },
})

const enhance = compose(
  defaultProps({ formName: 'rsvp' }),
  withState('name', 'setName', ''),
  withState('contact', 'setContact', ''),
  withState('attend', 'setAttend', ''),
  withState('guest', 'setGuest', ''),
  withState('notes', 'setNotes', ''),
  withStyles(styles)
)

const Rsvp = enhance(
  ({
    formName,
    classes,
    name,
    contact,
    attend,
    guest,
    notes,
    setName,
    setContact,
    setAttend,
    setGuest,
    setNotes,
  }) => (
    <Layout>
      <form
        name={formName}
        method="POST"
        action="/thanks"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        styleName="form"
        onSubmit={() => {
          console.log({
            name,
            contact,
            attend,
            guest,
            notes,
          })
        }}
      >
        <input type="hidden" name="form-name" value={formName} />
        <p hidden>
          <label>
            Please fill this out if you are a bot: <input name="bot-field" />
          </label>
        </p>
        <TextField
          name="name"
          type="text"
          id="name"
          label="Your Name"
          margin="dense"
          fullWidth
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          required
        />
        <FormControl
          component="fieldset"
          className={classes.formControl}
          margin="dense"
          fullWidth
        >
          <FormLabel component="legend" required>
            Will you attend?
          </FormLabel>
          <RadioGroup
            aria-label="Will you attend?"
            name="attend"
            className={classes.group}
            value={attend}
            onChange={({ target: { value } }) => setAttend(value)}
          >
            <FormControlLabel
              value="yes"
              control={<Radio required />}
              label="Yes, accept with pleasure"
            />
            <FormControlLabel
              value="no"
              control={<Radio required />}
              label="No, regretfully decline"
            />
          </RadioGroup>
        </FormControl>

        {attend !== 'no' && (
          <>
            <TextField
              name="guest"
              type="text"
              id="guest"
              label="Guest Name(s)"
              helperText="If bringing a guest"
              margin="dense"
              fullWidth
              value={guest}
              onChange={({ target: { value } }) => setGuest(value)}
            />
            <TextField
              name="contact"
              type={/^[-+0-9 ()]+$/.test(contact) ? 'tel' : 'email'}
              id="contact"
              label="Your Email or Phone"
              helperText="In case we need to contact you"
              margin="dense"
              fullWidth
              value={contact}
              onChange={({ target: { value } }) => setContact(value)}
              required
            />
          </>
        )}
        <TextField
          name="notes"
          type="text"
          id="notes"
          label="Other Notes"
          helperText="Dietary restrictions, comments, questions"
          multiline
          rowsMax="4"
          margin="dense"
          fullWidth
          value={notes}
          onChange={({ target: { value } }) => setNotes(value)}
        />

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Layout>
  )
)

export default Rsvp
