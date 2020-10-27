export default {
    'nodes': [
        {
            'text': 'python',
            'fx': -13.916222252976013,
            'fy': -659.1641376795345
        },
        {
            'text': 'help',
            'fx': 154.3247731601375,
            'fy': -429.73700786748157
        },
        {
            'text': 'articles',
            'fx': 455.7839253819375,
            'fy': -183.5539283546699
        },
        {
            'text': 'basics',
            'note': '',
            'fx': -98.5231997717085,
            'fy': -60.07462866512333
        },
        {
            'text': 'package manager',
            'fx': -346.2056231217888,
            'fy': 39.035120728630204
        },
        {
            'text': 'python libraries  ️',
            'fx': -78.69331502906573,
            'fy': 100.14771605920942
        },
        {
            'text': 'pip',
            'fx': -317.77054724755226,
            'fy': 153.56934975958518
        }
    ],
    'connections': [
        {
            'source': 'python',
            'target': 'basics',
            'curve': {
                'x': -43.5535,
                'y': 299.545
            }
        },
        {
            'source': 'help',
            'target': 'python',
            'curve': {
                'x': -78.1206,
                'y': -114.714
            }
        },
        {
            'source': 'basics',
            'target': 'python libraries  ️',
            'curve': {
                'x': 29.6649,
                'y': 80.1111
            }
        },
        {
            'source': 'basics',
            'target': 'package manager',
            'curve': {
                'x': -103.841,
                'y': 49.5548
            }
        },
        {
            'source': 'package manager',
            'target': 'pip',
            'curve': {
                'x': -19.7824,
                'y': 57.2671
            }
        },
        {
            'source': 'articles',
            'target': 'help',
            'curve': {
                'x': -238.287,
                'y': -54.4818
            }
        }
    ]
}