from setuptools import setup, find_packages

setup(
    name="create_component_cli",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[],
    entry_points={
        'console_scripts': [
            'create-component=create_component:main',
        ],
    },
)