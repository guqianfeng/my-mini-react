import { it, expect, describe } from 'vitest';
import React from '../core/React.js';

describe('createElement', () => {
    it('should return vdom', () => {
        const el = React.createElement('div', { id: 'app' }, 'app')
        expect(el).toEqual({
            type: 'div',
            props: {
                id: 'app',
                children: [
                    {
                        type: 'TEXT_ELEMENT',
                        props: {
                            nodeValue: 'app',
                            children: []
                        }
                    }
                ]
            }
        })

        
    })
})