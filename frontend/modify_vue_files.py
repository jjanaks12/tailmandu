import os
import re

directory = '/Users/janakshrestha/Documents/2025/05 May/trailmandu/frontend/pages/dashboard/events/[id]'
import_statement = "import ClearCacheButton from '@/components/pages/dashboard/event/ClearCacheButton.vue'\n"

for filename in os.listdir(directory):
    if filename.endswith('.vue') and filename != 'index.vue':
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Check if already modified
        if "ClearCacheButton" in content:
            continue
            
        # Add import statement
        # Find the end of imports or after <script ...>
        import_match = re.search(r'(import .*?\n)', content)
        if import_match:
            content = content[:import_match.start()] + import_statement + content[import_match.start():]
        else:
            script_match = re.search(r'<script.*?>', content)
            if script_match:
                content = content[:script_match.end()] + '\n' + import_statement + content[script_match.end():]
                
        # Find the breadcrumb div and wrap it
        # The div starts with <div class="mb-6 flex items-center...
        div_pattern = re.compile(r'(<div class="mb-6 flex items-center.*?</div>\s+</div>)', re.DOTALL)
        # Wait, the closing tag of the breadcrumb div might not be exactly followed by </div>.
        # It's better to use regex to find the start and carefully find the matching end.
        
        # Since the breadcrumb is usually just one level deep and ends with </div>
        # Let's use a simpler pattern:
        match = re.search(r'<div class="mb-6 flex items-center.*?>.*?</div>', content, re.DOTALL)
        if match:
            original_div = match.group(0)
            wrapped_div = f"""<div class="flex justify-between items-center mb-6">
    {original_div.replace('mb-6 ', '')}
    <ClearCacheButton :event-id="route.params.id as string" />
</div>"""
            content = content[:match.start()] + wrapped_div + content[match.end():]
            
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated {filename}")
        else:
            print(f"Could not find breadcrumb in {filename}")
