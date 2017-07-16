import r from 'got'
import kebab from 'decamelize'
import { serialise } from '../serialise'

/**
 * Update an existing resource - aliases: `update`
 * @memberof Kitsu
 * @param {String} model Model to update a resource under
 * @param {Object} data Data to send in a request
 *
 * @example
 * // Update a user's post (if created less than 30 mins ago)
 * kitsu.patch('posts', {
 *   id: '12345678',
 *   content: 'Goodbye world',
 * })
 */
export default async function (model, data) {
  try {
    if (!this.isAuth) throw new Error('Not authenticated')
    if (typeof data.id === 'undefined') throw new Error('PATCH request is missing a model ID')
    // Handle request
    const options = Object.assign({
      body: JSON.stringify(serialise(model, data, 'PATCH'))
    }, this._options)
    await r.patch(`${this._apiUrl}/${this._apiVersion}/${kebab(model, '-')}/${data.id}`, options)
      .catch(e => { throw JSON.parse(e.response.body) || e.response.body })
  } catch (e) {
    throw e
  }
}