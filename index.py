import importlib.util
import pathlib

for pyfile in pathlib.Path("/").glob('**/solution.py'): # or perhaps 'script*.py'
    spec = importlib.util.spec_from_file_location(f"{__name__}.imported_{pyfile.stem}" , pyfile)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    module.solution()