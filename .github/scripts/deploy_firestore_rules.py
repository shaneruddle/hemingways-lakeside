#!/usr/bin/env python3
"""Deploy Firestore security rules to a named database via Firebase Rules REST API."""
import json, sys, requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request

with open('/tmp/sa.json') as f:
    sa = json.load(f)
project_id = sa['project_id']
database_id = sys.argv[1] if len(sys.argv) > 1 else 'default'
rules_file = sys.argv[2] if len(sys.argv) > 2 else 'firestore.rules'

print(f'Project: {project_id}, Database: {database_id}')

creds = service_account.Credentials.from_service_account_info(
    sa, scopes=['https://www.googleapis.com/auth/firebase'])
creds.refresh(Request())
headers = {'Authorization': f'Bearer {creds.token}', 'Content-Type': 'application/json'}

with open(rules_file) as f:
    rules = f.read()

base = f'https://firebaserules.googleapis.com/v1/projects/{project_id}'

# 1. Create ruleset
r = requests.post(f'{base}/rulesets', headers=headers,
    json={'source': {'files': [{'name': rules_file, 'content': rules}]}})
r.raise_for_status()
ruleset_name = r.json()['name']
print(f'Created ruleset: {ruleset_name}')

# 2. Release for the named database
# Release name format: cloud.firestore/{database_id}
release_id = f'cloud.firestore/{database_id}'
release_full_name = f'projects/{project_id}/releases/{release_id}'
release_body = {'name': release_full_name, 'rulesetName': ruleset_name}

# Try PATCH (update existing), fall back to POST (create new)
r2 = requests.patch(
    f'{base}/releases/{requests.utils.quote(release_id, safe="")}?updateMask=rulesetName',
    headers=headers,
    json={'release': release_body}
)
if r2.status_code == 404:
    print(f'Release {release_id} not found, creating...')
    r2 = requests.post(f'{base}/releases', headers=headers, json=release_body)

r2.raise_for_status()
print(f'Rules deployed successfully to {release_id}')
print(f'Release: {r2.json().get("name", "")}')
